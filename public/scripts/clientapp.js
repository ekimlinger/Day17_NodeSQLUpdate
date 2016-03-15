$(document).ready(function() {

    $('#submit-button').on('click', postData);
    getData();

});

function postData() {
    event.preventDefault();

    var values = {};
    $.each($('#sql-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/people',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
                appendDom();
            } else {
                console.log('error');
            }
        }
    });

}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: function(data) {
            console.log(data);
            appendDom(data);
        }
    });
}

function appendDom(people){
  //emptys container in order to refresh
  $('.people').html('');
  //set people[i] = person

  for(var i =0; i < people.length; i++){
    var person = people[i];
    $('.people').append('<div class="person"></div>');
    $el = $('.people').children().last();
    $el.append('<h3>'+person.name+'</h3>');
    $el.append('<p>'+person.address+' '+person.city+', '
                +person.state+' '+person.zip_code+'</p>');
  }

}
