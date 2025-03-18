const fs = require("fs");

exports.startMediaRecording = async () => {
    return new Promise((resolve) => {
        console.log("Recording started...");
        setTimeout(() => {
            console.log("Recording complete. Sending media...");
            resolve("sample-media-file.mp4");
        }, 60000); // 1-minute recording
    });
};