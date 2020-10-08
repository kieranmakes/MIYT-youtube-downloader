
/* 
    allows for drag and dropping of text files 
    into a text area, resulting in the output 
    of the textual data in the text area
*/
const text_area = document.getElementById('text-area');

function dropfile(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      text_area.value = e.target.result;
    };
    reader.readAsText(file, "UTF-8");
  }

text_area.ondrop = function(e) {
e.preventDefault();
var file = e.dataTransfer.files[0];
dropfile(file);
};


