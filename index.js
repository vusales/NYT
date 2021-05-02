// inputlarin valuelarini yoxlayan func.
function TestingInptValue() {
    //define dom elements
    var searchTerm = $('#search-term').val();
    var numberOfRecords = $('#number-of-records').val();
    var startYear = $('#start-year').val();
    var endYear = $('#end-year').val();
    var error = [];
    if ($('#search-term').is(':required') && !searchTerm.trim()) {
        error.push({
            id: '#search-term',
            message: 'Search term is not correct',
        });
    }
    if (['1', '5', '10'].indexOf(numberOfRecords) === -1) {
        error.push({
            id: '#number-of-records',
            message: 'Number of records is not correct',
        });
    }
    if ($('#start-year').is(':required') && !startYear.trim()) {
        error.push({
            id: '#start-year',
            message: 'Start year is not correct',

        });
    }
    if ($('#end-year').is(':required') && !endYear.trim()) {
        error.push({
            id: '#end-year',
            message: 'End year is not correct',
        });
    }
    if (error.length){
        return error;
    }else{
        return false;
    }
}

function clear() {
    $('#articles-list').empty();
    $('.is-invalid').removeClass('is-invalid') ; 
    $('.afterDiv').remove();
}

function sendObject(){
    //define dom elements
    var searchTerm = $('#search-term').val();
    var numberOfRecords = $('#number-of-records').val();
    var startYear = $('#start-year').val();
    var endYear = $('#end-year').val();

    var obj = {
        'q': searchTerm,
        'numberOfRecords': numberOfRecords,
        'api-key': 'oF5iHJ7YPNAwDRVdkyqJlfIQN1bKnzjj',
    }
    if (startYear) {
        obj['begin_date'] = startYear + "0101";
    }
    if (endYear) {
        obj['end_date'] = endYear + '1231';
    }
    return obj;
}

function Response (response){
    var news = response.response.docs;
    for(var i =0;i<news.length ; i++){
       var item = news[i];  
       ShowNews(item);
    }       
}
function ShowNews(item){
    var title =item["headline"]["main"];
    var abstract = item["abstract"];
    var link = item["web_url"];

    $('#articles-list').append(`
    <div class="newsTitle"><a href="${link}"><h2>${title}</h2><a></div>
    <div class="abstract">${abstract}</div>
    <hr>
    `);
}

$(document).ready(function () {
    // search buttona click edende inputlar icinden melumatlari yoxlayaraq goturmelidir.
    $("#run-search").on("click", function (){
        clear();
        // inputlarin melumatlarinin yoxlanilmasi.
        var inpValues = TestingInptValue(); 
        if (inpValues!== false){
            for(err of inpValues){
               
                $(err.id).addClass('is-invalid');
                $(err.id).after(`<div class="afterDiv">${err.message}</div>`);
            }
        }else{
            var data = sendObject();
            
            $.ajax({
                url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?',
                data: data,
                method: 'GET',
            }).done(Response);
        }



    });


    $("#clear-all").on('click', function () {

        clear();

    });

});




