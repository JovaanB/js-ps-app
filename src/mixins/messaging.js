export default {
  methods: {
    sendMessage(message, payload) {
      let resolve, reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      this.$socket.client.emit(message, payload, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
      return promise;
    },

    runScript(payload) {
      let resolve, reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      this.$socket.client.emit("runScript", payload, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
      return promise;
    },
  },
};
