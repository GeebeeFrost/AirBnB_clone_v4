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
});
