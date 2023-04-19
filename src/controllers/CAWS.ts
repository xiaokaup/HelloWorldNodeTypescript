// AWS SDK for JavaScript: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/index.html

import { Request, Response, NextFunction } from "express";
import {
  EC2Client,
  RunInstancesCommand,
  RunInstancesCommandInput,
  _InstanceType,
  EC2ClientConfig,
} from "@aws-sdk/client-ec2";
import { AwsCredentialIdentity } from "@aws-sdk/types";

import fs from "fs";
import path from "path";
import btoa from "btoa";

export const createVM = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { os } = req.body;

  let scriptSetuporiginMetadataContent: string, scriptSetupAgentContent: string;
  let awsInput: RunInstancesCommandInput | null = null;

  if (os === "Linux") {
    scriptSetuporiginMetadataContent = fs.readFileSync(
      path.join(__dirname, "../../scripts/setup_linux_key.sh"),
      "utf8"
    );
    scriptSetupAgentContent = fs.readFileSync(
      path.join(__dirname, "../../scripts/setup_linux.sh"),
      "utf8"
    );
    awsInput = {
      ImageId: "ami-02b01316e6e3496d9",
      InstanceType: _InstanceType.t3_nano,
      SecurityGroupIds: ["sg-0f3299071dcdce83e"],
      SubnetId: "subnet-0c8782d18d92c563d",
      MinCount: 1,
      MaxCount: 1,
      KeyName: "awsResearch",
      UserData: btoa(`
      ${scriptSetuporiginMetadataContent}
  
      ${scriptSetupAgentContent.replace("#!/bin/bash", "")}
      `), // convert string to base64
    } as RunInstancesCommandInput;
  } else if (os === "Windows") {
    scriptSetuporiginMetadataContent = fs.readFileSync(
      path.join(__dirname, "../../scripts/setup_windows_key.ps1"),
      "utf8"
    );
    scriptSetupAgentContent = fs.readFileSync(
      path.join(__dirname, "../../scripts/setup_windows.ps1"),
      "utf8"
    );
    awsInput = {
      ImageId: "ami-09650503efc8d2335",
      InstanceType: _InstanceType.t3_nano,
      SecurityGroupIds: ["sg-0f3299071dcdce83e"],
      SubnetId: "subnet-0c8782d18d92c563d",
      MinCount: 1,
      MaxCount: 1,
      KeyName: "awsResearch",
      UserData: btoa(`
          ${scriptSetuporiginMetadataContent}
      
          ${scriptSetupAgentContent.replace("#!/bin/bash", "")}
          `), // convert string to base64
    } as RunInstancesCommandInput;
  }

  const credentialConfig: AwsCredentialIdentity = {
    accessKeyId: process.env.ACCESS_KEY_ID as string,
    secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
  };

  const ec2ClientConfig: EC2ClientConfig = {
    credentials: credentialConfig,
    region: "eu-west-3",
  };

  const client = new EC2Client(ec2ClientConfig);
  const command = new RunInstancesCommand(awsInput as RunInstancesCommandInput);
  const response = await client.send(command);

  res.status(200).json(response);
};

export const getNewCommand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const scriptContent = fs.readFileSync(
    path.join(__dirname, "../../scripts/2022-12-22-first_script.sh"),
    "utf8"
  );

  res.status(200).json({ result: scriptContent });
};
