(function(window, document, $, undefined) {

  window.gotoThere = function (link) {
    window.location = link;
  };

  $('#jumper').change(function() {
    window.gotoThere($(this).val());
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 34) {
      $('#next').click();
    }
    if (e.keyCode == 33) {
      $('#previous').click();
    }
  });

  if (window.canIUseLookup && typeof window.canIUseLookup !== 'undefined') {
    $.getJSON('../data.json', function(data) {

      if (data.data && data.data[window.canIUseLookup]) {
        data = data.data[window.canIUseLookup].stats;
      } else {
        return;
      }

      var $chartHead = $('#types').find('thead tr:first'),
          $chartBody = $('#types').find('tbody tr:first'),
          skippedBrowsers = ['op_mini', 'bb', 'op_mob', 'ie_mob', 'ff_mob', 'and_ff', 'and_chr'];

      $chartHead.html('');
      $chartBody.html('');

      $.each(data, function(key, val) {

        var y = [],
            a = [],
            firstBrowser,
            compatibility;

        // get first above
        $.each(data[key], function(k, v) {

          if (v === 'y') {
            y.push(k);
          } else if (v === 'a') {
            a.push(k);
          }

          firstBrowser = y[0];
          compatibility = 'y';

          if (firstBrowser === undefined) {
            firstBrowser = a[0];
            compatibility = 'a';
            if (firstBrowser === undefined) {
              firstBrowser = 0;
              compatibility = 'n';
            }
          }
        });

        if (skippedBrowsers.indexOf(key) === -1) {
          var $th = $('<th>');
          $('<img>', {
            src: '/images/browsers/' + key + '.png',
            alt: key
          }).appendTo($th);
          $th
            .append('<div>' + key + '</div>')
            .append('<span>' + firstBrowser + '+</span>');

          var $td = $('<td>');

          if (compatibility === 'y') {
            $td.append('<img src="/html5/images/check.png">');
          } else if (compatibility === 'a') {
            $td.append('<img src="/html5/images/kinda.png">');
          } else {
            $td.append('<img src="/html5/images/x.png">');
          }

          $chartHead.append($th);
          $chartBody.append($td);
        }
      });
    });
  }

})(window, document, jQuery);
