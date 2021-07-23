import './style.css';

function downloadJsonTimeTable() {
  return new Promise((resolve, reject) => {
    const dataJSON = [];

    // removes \t and \n between strings
    const extremeTrim = (str) => {
      str = str.replace(/\t/g, '');
      str = str.replace(/\n/g, ' ');
      return str;
    };

    // extracting course info
    const extractCourseInfo = (str) => {
      const res = str.split('-');
      return res;
    };

    // extracting slots
    const extractSlots = (str) => {
      const res = str.split('+');
      // Poping out Venue
      const last = res.pop();
      res.push(last.split(' - ')[0]);
      return res;
    };

    // extracting credits info
    const extractCredits = (str) => {
      const res = str.split(' ');
      return res;
    };

    // Parsing Starts here
    const tableData = [];
    const len = $('.table > tbody:nth-child(1) > tr').length - 2;

    $('.table > tbody:nth-child(1) > tr').each((index, element) => {
      if (index > 2 && index <= len) {
        const row = `.table > tbody:nth-child(1) > tr:nth-child(${index}) > td`;
        const subData = [];
        $(row).each((subindex, subelement) => {
          subData.push(extremeTrim($(subelement).text().trim()));
        });
        tableData.push(subData);
      }
    });

    // saved tableData array converts to JSON here
    for (let i = 0; i < tableData.length; i++) {
      const j = {};
      let creditSum = 0;
      j.slot = extractSlots(tableData[i][7]);
      const courseInfo = extractCourseInfo(tableData[i][2]);
      const type_want = courseInfo[1].split('(');
      if (tableData[i][2].includes('Theory')) {
        j.type = 'Embedded Theory';
      } else if (tableData[i][2].includes('Project')) {
        j.type = 'Embedded Project';
      } else if (tableData[i][2].includes('Lab')) {
        j.type = 'Embedded Lab';
      } else if (tableData[i][2].includes('Soft')) {
        j.type = 'Soft Skills';
      }
      j.CCode = courseInfo[0];
      j.CName = type_want[0].trim();
      j.LTPJC = extractCredits(tableData[i][3]);
      j.category = tableData[i][4];
      const section = tableData[i][7].split('-');
      j.classRoom = section[1].trim();
      const firstname = tableData[i][8].split('-');
      j.fName = firstname[0].trim();
      creditSum += j.LTPJC;
      dataJSON.push(j);
    }

    resolve(dataJSON);
  });
}

function downloadObjectAsJson(exportObj, exportName) {
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportObj))}`;
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', `${exportName}.json`);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function readSingleFile(evt) {
  const file = evt.target.files[0];
  try {
    if (file) {
      const r = new FileReader();
      r.onload = function (e) {
        const contents = e.target.result;
        $('#ReadResult').append($(contents));
        const TT = $('#ReadResult').find('#getStudentDetails');
        if (TT.length === 0) {
          $('#ReadResult').empty();
          throw new Error('Given HTML File is Not Valid');
        }
        $('#ReadResult').empty().append(TT).show();
      };
      r.readAsText(file);
    } else {
      throw new Error('Failed to load file');
    }
  } catch (error) {
    alert(error.message);
  }
}

function initatedownload() {
  if ($('#ReadResult').empty()) {
    alert('Please Give a HTML as Input');
  } else {
    downloadJsonTimeTable()
      .then((results) => {
        downloadObjectAsJson(results, new Date().toUTCString());
      });
  }
}

document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
document.getElementById('download').addEventListener('click', initatedownload, false);
