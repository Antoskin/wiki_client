$(document).ready( () => {
    const root = $('#root');
    const inputArea = (`<section class="organs">
                            <input class="inputer" type='text' />
                            <button class="btn waves-effect waves-light btn-large">click</button>
                        </section>
                        <ul class="out"></ul>`);
    const loader = `<div class="preloader-wrapper small active">
                        <div class="spinner-layer spinner-green-only">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div><div class="gap-patch">
                            <div class="circle"></div>
                        </div><div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                        </div>
                    </div>`;
    root.append(inputArea);

    $('.btn').click( () => {
        let value_input = $('.inputer').val();
        const url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${value_input}&format=json&callback=?`;

        $.ajax({
            type: 'GET',
            url: url,
            async:false,
            dataType: 'json',
            beforeSend: () => {
                $('.out').prepend(loader);
            },  
            success: (data) => {
                $('.out').html('');
                for(let i = 0; i < data.length; i++) {
                    // $('.out').append(`<a class='linker' href=${data[3][i]}>${data[1][i]}</a><p>${data[2][i]}</p>`)
                    $('.out').append(`<div class="row">
                                            <div class="col m12">
                                                <div class="card blue-grey darken-1 z-depth-4">
                                                    <div class="card-content white-text">
                                                        <span class="card-title">${data[1][i]}</span>
                                                        <p>${data[2][i]}</p>
                                                    </div>
                                                    <div class="card-action">
                                                        <a href=${data[3][i]} target="_blank">See</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`);
                }
            },
            error: (errorMessage) => {
                alert('error');
            }
        })

    });

    $('.inputer').keypress( (e) => {
        { e.which == 13 && $('.btn').click() }
    })



});