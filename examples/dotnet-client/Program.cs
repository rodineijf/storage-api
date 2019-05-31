using System;
using System.IO;
using RestSharp;

namespace dotnet_client
{
    class Program
    {
        static void Main(string[] args)
        {
            var client = new RestClient("http://localhost:3000");

            // send to server
            var sendRequest = new RestRequest("/storage", Method.POST);
            sendRequest.AddFile("file", "sample.jpg");
            sendRequest.AddHeader("Content-Type", "multipart/form-data");
            var sendResponse = client.Execute(sendRequest);

            // send to server base64
            var sendBase64Request = new RestRequest("/storage", Method.POST);
            var base64String = @"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";
            sendBase64Request.AddFileBytes("file", Convert.FromBase64String(base64String), "my-file.jpg");
            sendBase64Request.AddHeader("Content-Type", "multipart/form-data");
            var sendBase64Response = client.Execute(sendBase64Request);

            // get from server
            var getRequest = new RestRequest("/storage/{id}", Method.GET);
            getRequest.AddUrlSegment("id", "<id goes here>");
            var getResponse = client.Execute(getRequest);
            // Here is your download file
            // -> getResponse.RawBytes;

            // delete from server
            var deleteRequest = new RestRequest("/storage/{id}", Method.DELETE);
            deleteRequest.AddUrlSegment("id", "<id goes here>");
            var deleteResponse = client.Execute(deleteRequest);
        }
    }
}
