const memoryjs = require('memoryjs');

const processName = 'eRoReturn.exe';
const lockMap = "pay_fild08";
const processObject = memoryjs.openProcess(processName);
setInterval(() => {
    process.stdout.write('\033c')



    console.log('nick', memoryjs.readMemory(processObject.handle, 0x0101EEF0, memoryjs.STRING));


    console.log('lvl', memoryjs.readMemory(processObject.handle, 0x01018D78, memoryjs.INT));
    console.log('jobLvl', memoryjs.readMemory(processObject.handle, 0x01018DBC, memoryjs.INT));
    let hp = memoryjs.readMemory(processObject.handle, 0x0101C740, memoryjs.INT);
    let maxHp = memoryjs.readMemory(processObject.handle, 0x0101C744, memoryjs.INT);

    console.log('HP ', `${hp}/${maxHp}`); // "this is a sample string";



    let sp = memoryjs.readMemory(processObject.handle, 0x0101C748, memoryjs.INT);
    let maxSp = memoryjs.readMemory(processObject.handle, 0x0101C74c, memoryjs.INT);
    console.log('SP ', `${sp}/${maxSp}`); // "this is a sample string";



    let cord_x = memoryjs.readMemory(processObject.handle, 0x0100561c, memoryjs.INT);
    let cord_y = memoryjs.readMemory(processObject.handle, 0x01005620, memoryjs.INT);
    let map = memoryjs.readMemory(processObject.handle, 0x01017EE4, memoryjs.STRING);
    console.log('cord ', `${cord_x},${cord_y}`); // "this is a sample string";
    console.log('map', map);



    let weight = memoryjs.readMemory(processObject.handle, 0x01018E28, memoryjs.INT);
    let totalWeight = memoryjs.readMemory(processObject.handle, 0x01018E24, memoryjs.INT);
    console.log('weight ', `${weight}/${totalWeight}`); // "this is a sample string";

    let weightPercent = weight / (totalWeight / 100);
    if (hp == 1 || sp < 30 || weightPercent > 49 || map != lockMap) {
        //Tewas atau sp abis atau berat atau tidak di lockmap, kill process
        //kalau bisa kirim notif
        process.kill(processObject.th32ProcessID, 'SIGKILL');

    }




}, 500);
