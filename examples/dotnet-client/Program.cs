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

            // get from server
            var getRequest = new RestRequest("/storage/{id}", Method.GET);
            getRequest.AddUrlSegment("id", "<id goes here>");
            var getResponse = client.Execute(getRequest);
            // Here is your download file
            getResponse.RawBytes;

        }
    }
}
