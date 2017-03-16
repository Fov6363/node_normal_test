const XLSX = require('xlsx');
var data = [
    [1,2,3],
    [true, false, null, "sheetjs"],
    ["foo","bar",'1992129012', "0.3"],
    ["baz", null, "qux"]
];

var ws_name = "年度报表";



/* dummy workbook constructor */
function Workbook() {
    if(!(this instanceof Workbook)) return new Workbook();
    this.SheetNames = [];
    this.Sheets = {};
}
var wb = new Workbook();


/* convert an array of arrays in JS to a CSF spreadsheet */
function sheet_from_array_of_arrays(data, opts) {
    var ws = {};
    var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
    for(var R = 0; R != data.length; ++R) {
        for(var C = 0; C != data[R].length; ++C) {
            if(range.s.r > R) range.s.r = R;
            if(range.s.c > C) range.s.c = C;
            if(range.e.r < R) range.e.r = R;
            if(range.e.c < C) range.e.c = C;
            var cell = {v: data[R][C] };
            if(cell.v == null) continue;
            var cell_ref = XLSX.utils.encode_cell({c:C,r:R});

            /* TEST: proper cell types and value handling */
            if(typeof cell.v === 'number') cell.t = 'n';
            else if(typeof cell.v === 'boolean') cell.t = 'b';
            else cell.t = 's';
            ws[cell_ref] = cell;
        }
    }

    /* TEST: proper range */
    if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
    return ws;
}
var ws = sheet_from_array_of_arrays(data);

/* TEST: add worksheet to workbook */
wb.SheetNames.push(ws_name);
wb.Sheets[ws_name] = ws;


/* write file */
XLSX.writeFile(wb, 'sheetjs.xlsx');