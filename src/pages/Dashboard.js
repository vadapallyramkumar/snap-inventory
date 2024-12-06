import React from "react";
import Card from "../components/Card";
import Chart from "../components/Chart";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        Hi, here’s what’s happening in your Snap stores
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Revenue Generated"
          value="$8619.86"
          subtitle="+$500 compared to last month (Nov)"
        />
        <Card
          title="Top Revenue-Generating Snap Category"
          value="Amazon S3 - $456,789.12"
          subtitle="0.95 items more than last month (Nov)"
        />
        <Card
          title="Total Snaps Used"
          value="12,345"
          subtitle="+1,234 snaps compared to last month (Nov)"
        />
        <Card title="Most Used Snap Category" value="Flow - 2,345 executions" />
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Your Snap Usage this Month</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Chart
            type="Bar"
            title="Most revenue generated snap category"
            chartData={[250000, 456789, 150000, 120000, 180000, 95000]}
            chartTitle="Revenue ($)"
            labels={[ "API Suite", "Amazon S3", "Anaplan", "Binary", "DynamoDB", "Flow", ]}
          />
          <Chart
            type="Pie"
            chartData={[2000, 1500, 1000, 850, 1200, 800]}
            chartTitle="Snap usage across categories"
            title="Snap usage across categories"
            labels={[ "API Suite", "Amazon S3", "Anaplan", "Binary", "DynamoDB", "Flow", ]}
          />
          <Chart
            type="Line"
            chartTitle="Monthly Revenue ($)"
            title="Monthly Revenue ($)"
            labels={[ "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", ]}
            chartData={[
              100000, 230000, 456789, 250000, 350000, 200000
            ]}
          />
        </div>
      </div>

      <div className="mt-6 p-6 bg-white rounded-lg shadow-md border border-background-VERY_LIGHT">
        <h2 className="text-lg font-semibold mb-4">Top Used Snaps</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-1/5 py-3 px-4 text-left font-bold text-gray-600 bg-gray-50">
                  Snap Name
                </th>
                <th className="w-1/5 py-3 px-4 text-left font-bold text-gray-600 bg-gray-50">
                  Category
                </th>
                <th className="w-1/5 py-3 px-4 text-left font-bold text-gray-600 bg-gray-50">
                  Usage Count
                </th>
                <th className="w-1/5 py-3 px-4 text-left font-bold text-gray-600 bg-gray-50">
                  Revenue ($)
                </th>
                <th className="w-1/5 py-3 px-4 text-left font-bold text-gray-600 bg-gray-50">
                  Execution Time (ms)
                </th>
              </tr>
            </thead>
            <tbody className="max-h-60 overflow-y-auto">
              <tr className="bg-background-VERY_LIGHT  w-full">
                <td className="py-2 px-4 w-1/5">Amazon S3 Connector</td>
                <td className="py-2 px-4 w-1/5">Amazon S3</td>
                <td className="py-2 px-4 w-1/5">2,345</td>
                <td className="py-2 px-4 w-1/5">450,000</td>
                <td className="py-2 px-4 w-1/5">120</td>
              </tr>
              <tr className=" w-full">
                <td className="py-2 px-4 w-1/5">Flow Orchestrator</td>
                <td className="py-2 px-4 w-1/5">Flow</td>
                <td className="py-2 px-4 w-1/5">1,500</td>
                <td className="py-2 px-4 w-1/5">200,000</td>
                <td className="py-2 px-4 w-1/5">150</td>
              </tr>
              <tr className="bg-background-VERY_LIGHT  w-full">
                <td className="py-2 px-4 w-1/5">Anaplan Snap</td>
                <td className="py-2 px-4 w-1/5">Anaplan</td>
                <td className="py-2 px-4 w-1/5">1215</td>
                <td className="py-2 px-4 w-1/5">90,000</td>
                <td className="py-2 px-4 w-1/5">95</td>
              </tr>
              <tr className=" w-full">
                <td className="py-2 px-4 w-1/5">Azure SQL - Bulk Extract</td>
                <td className="py-2 px-4 w-1/5">Azure SQL</td>
                <td className="py-2 px-4 w-1/5">800</td>
                <td className="py-2 px-4 w-1/5">200,000</td>
                <td className="py-2 px-4 w-1/5">150</td>
              </tr>
              <tr className="bg-background-VERY_LIGHT  w-full">
                <td className="py-2 px-4 w-1/5">SQS Acknowledge</td>
                <td className="py-2 px-4 w-1/5">Amazon SQS</td>
                <td className="py-2 px-4 w-1/5">750</td>
                <td className="py-2 px-4 w-1/5">90,000</td>
                <td className="py-2 px-4 w-1/5">95</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
