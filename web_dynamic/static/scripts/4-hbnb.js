$(document).ready(() => {
  $.get('http://localhost:5001/api/v1/status/', (res) => {
    if (res.status === 'OK') $('div#api_status').addClass('available');
    else $('div#api_status').removeClass('available');
  });
  const amenities = [];
  // use event delegation on parent element for dynamically added children
  $('.amenities-list').on('change', '.amenity-checkbox', function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');
    if ($(this).is(':checked')) {
      const amenity = {};
      amenity.amenityId = amenityId;
      amenity.amenityName = amenityName;
      amenities.push(amenity);
    } else {
      const rem = amenities.findIndex(amenity => amenity.amenityId === amenityId);
      amenities.splice(rem, 1);
    }
    let amenitiesList = '';
    amenities.forEach((amenity, i) => {
      if (i === amenities.length - 1) amenitiesList += amenity.amenityName;
      else amenitiesList += amenity.amenityName + ', ';
    });
    if (amenitiesList) $('.amenities h4').text(amenitiesList);
    else $('.amenities h4').html('&nbsp;');
  });
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: '{}',
    success: (res, status, xhr) => {
      res.forEach((place) => {
        const articleTag = $('<article>');

        const titleBox = $('<div class="title_box">');
        titleBox.append($('<h2>').text(place.name));
        titleBox.append($('<div class="price_by_night">').text('$' + place.price_by_night));

        const information = $('<div class="information">');
        information.append($('<div class="max_guest">').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '')));
        information.append($('<div class="number_rooms">').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '')));
        information.append($('<div class="number_bathrooms">').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '')));

        const description = $('<div class="description">').text(place.description);

        articleTag.append(titleBox, information, description);
        $('section.places').append(articleTag);
      });
    }
  });
  $('button#search').click(() => {
    const amenityIds = [];
    amenities.forEach((amenity) => {
      amenityIds.push(amenity.amenityId);
    });
    $.ajax({
      url: 'http://localhost:5001/api/v1/places_search',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: amenityIds }),
      dataType: 'json'
    });
  });
});
