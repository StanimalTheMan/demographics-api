const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const textModeration = (req, res) => {
  const stub = ClarifaiStub.grpc();
  const metadata = new grpc.Metadata();
  metadata.set("authorization", "Key {My_Key}");
  stub.PostWorkflowResults(
    {
      workflow_id: "Text Moderation",
      inputs: [{ data: { text: "I will kill you." } }],
    },

    metadata,
    (err, response) => {
      if (response) {
        res.send(response);
      } else {
        console.log(err);
        res.status(400);
      }
    }
  );
};
