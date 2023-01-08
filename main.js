
const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
    let UID = await client.join(config.TOKEN, config.CHANNEL, null);
    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

    let player = `<div id="video-container" id="user-container-${UID}">
        <div id="user-${UID}" class="video-player"></div>
    </div>`

    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player);

    localTracks[1].play(`user-${UID}`);
    await client.publish([localTracks[0], localTracks[1]]);
}


const joinStream = async () => {
    await joinAndDisplayLocalStream();
    document.getElementById('join-btn').style.display = 'none';
    document.getElementById('streams-controls').style.display = 'flex';
};



document.getElementById('join-btn').addEventListener('click', joinStream);




/*
client.init(config.APP_ID, () => {
    console.log("AgoraRTC client initialized");
    client.join(config.TOKEN, config.CHANNEL, null, (uid) => {
        console.log("User " + uid + " join channel successfully");
        client.publish(localStream, (err) => {
            console.log("Publish local stream error: " + err);
        });
    }, (err) => {
        console.log("Join channel failed", err);
    });
}, (err) => {
    console.log("AgoraRTC client init failed", err);
});
*/