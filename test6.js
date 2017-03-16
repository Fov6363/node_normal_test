/**
 * Created by yuanyuan on 16/12/30.
 */
const XLSX = require('xlsx');

// let workbook = XLSX.readFile('../Excel_import_template.xlsx');
let workbook = XLSX.readFile('./sheetjs.xlsx');

let result = to_json(workbook);
console.log(result);

function to_json(workbook) {
    var result = {};
    workbook.SheetNames.forEach(function(sheetName) {
        var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if(roa.length > 0){
            result[sheetName] = roa;
        }
    });
    return result;
}
