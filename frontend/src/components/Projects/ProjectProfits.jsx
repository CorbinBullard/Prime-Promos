import { Flex, Table } from "antd";
import React, { useMemo } from "react";
import { Typography } from "antd";
const { Title, Text } = Typography;

const columns = [
  { title: "Item", dataIndex: "name", key: "name" },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    render: (quantity) => quantity || "-",
  },
  {
    title: "Unit Profit",
    dataIndex: "sellUnitProfit",
    key: "sellUnitProfit",
    render: (_, record) => {
      const sellTotal = record.sellUnitPrice * record.quantity;
      const netTotal = record.netUnitPrice * record.quantity;
      return `$${(sellTotal - netTotal).toFixed(2) || "-"}`;
    },
  },
  {
    title: "Setup Profit",
    dataIndex: "setupProfit",
    key: "setupProfit",
    render: (_, record) => {
      return `$${(record.sellSetup - record.netSetup).toFixed(2) || "-"}`;
    },
  },
];

export default function ProjectProfits({ project }) {
  const totalProfits = useMemo(
    () =>
      project.Items.reduce(
        (acc, item) => {
          const sellTotal = item.sellUnitPrice * item.quantity;
          const netTotal = item.netUnitPrice * item.quantity;
          const unitProfit = sellTotal - netTotal;
          const setupProfit = item.sellSetup - item.netSetup;
          acc.totalUnitProfit += unitProfit;
          acc.totalSetupProfit += setupProfit;
          return acc;
        },
        { totalUnitProfit: 0, totalSetupProfit: 0 }
      ),
    [project]
  );
  console.log(totalProfits);
  return (
    <Table
      columns={columns}
      dataSource={project.Items}
      footer={() => {
        return (
          <Flex vertical>
            <Text strong>
              Unit Profit: ${totalProfits.totalUnitProfit.toFixed(2)}
            </Text>
            <Text strong>
              Setup Profit: ${totalProfits.totalSetupProfit.toFixed(2)}
            </Text>
            <Text strong>
              Total Profit: ${totalProfits.totalUnitProfit.toFixed(2)}
            </Text>
          </Flex>
        );
      }}
    />
  );
}
