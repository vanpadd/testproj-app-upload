# testproj-app-upload
Uploads and confirms upload of app to TestProject

```

node <path_to_node_module_index_js> <appID> <projectID> <apiKey> <newFileName> <pathToFile>
```

Where:

- <path_to_node_module_index_js>: Script to upload binary to TestProject
- <appID>: Application’s ID on TestProject
- <projectID>: Project’s ID in TestProject
- <apiKey>: API key from the TestProject Developers page
- <newFileName>: Name the file to confirm the upload
- <pathToFile>: Path to latest apk or ipa file in your project

The following will happen in sequence:

- Get an upload URL for an application
- Upload the new APK to AWS S3
- Confirm the new file upload

Once app is uploaded to TestProject, the following can be run in your CI pipeline as a step:

```

runtpjob jobId: <jobId>, projectId: <projectId>, waitJobFinishSeconds: <timeInSeconds>
```
