$(function () {
    // function to create time blocks and 
    function createTimeBlocks() {
      for (let hour = 9; hour <= 17; hour++) { // loops from 9a to 5p
        var timeBlock = $('<div>').addClass('row time-block').attr('id', 'hour-' + hour);
        var hourDiv = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text((hour % 12 || 12) + (hour < 12 ? 'AM' : 'PM')); // convert 24-hour time to 12-hour time with AM/PM by fixing the midnight/noon issue returning 0
        var textArea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', '3');
        var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save').html('<i class="fas fa-save" aria-hidden="true"></i>');
  
        timeBlock.append(hourDiv, textArea, saveBtn); // append elements to the time block
        $('#timeblock-container').append(timeBlock); // append the time block to the container
  
        // retrieve event from local storage
        var event = localStorage.getItem('hour-' + hour);
        if (event) {
          textArea.val(event);
        }
  
        // set time block color based on past, present, or future
        var currentHour = dayjs().hour();
        if (hour < currentHour) {
          timeBlock.addClass('past');
        } else if (hour === currentHour) {
          timeBlock.addClass('present');
        } else {
          timeBlock.addClass('future');
        }
      }
    }
    // save events into local storage
    function saveEvent() {
        var hour = $(this).closest('.time-block').attr('id');
        var eventText = $(this).siblings('.description').val();
    
        localStorage.setItem(hour, eventText);
      }
    
      // displays the current day
      $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
    
     
      createTimeBlocks();
    
      // event listener for save buttons
      $('.saveBtn').on('click', saveEvent);
    });
    


        