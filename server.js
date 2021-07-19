const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

const demographics = (req, res) => {
  const { url } = req.body;
  const stub = ClarifaiStub.grpc();
  const metadata = new grpc.Metadata();
  metadata.set("authorization", `Key ${process.env.KEY}`);
  stub.PostWorkflowResults(
    {
      workflow_id: "Demographics",
      inputs: [
        {
          data: {
            image: {
              url,
            },
          },
        },
      ],
    },

    metadata,
    (err, response) => {
      if (response) {
        // const data = stringify(
        //   response.results[0].outputs[4].data.regions,
        //   null,
        //   2
        // );

        res.send(response);
      } else {
        console.log(err);
        res.status(400);
      }
    }
  );
};

app.post("/data", demographics);

app.listen(PORT, () => {
  console.log("Working at port ", PORT);
});
