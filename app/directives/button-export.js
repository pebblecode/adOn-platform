angular.module('adon')
  .directive('export', [
    'Sender',
    function(Sender) {
      return {
        restrict: 'E',
        template: '<button class="btn">Export</button>',
        replace: true,
        scope: {
          shortcode: '=shortcode'
        },
        link: function link(scope, element, attrs) {
                    
          element.on('click', function(event) {
            event.preventDefault();
            element.text('Exporting...');
            element.addClass('btn-info');

            Sender.exporter.exportMessage(scope.shortcode);

            Sender.exporter.on('export', function(audioBlob) {
               var a = document.createElement('a');
               a.href = window.URL.createObjectURL(audioBlob);
               a.download = scope.shortcode + '.wav';
               a.click();
               element.removeClass('btn-info');
               element.text('Export');
            });
          });
        }
      }
    }
  ]);
