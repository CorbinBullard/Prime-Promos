import React, { useMemo } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import dayjs from "dayjs";
import { Typography } from "antd";

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 30,
  },
  logo: {
    width: 50,
    height: 60,
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    marginTop: 24,
  },
  reportTitle: {
    color: "#61dafb",
    letterSpacing: 4,
    fontSize: 25,
    textAlign: "left",
    textTransform: "uppercase",
  },
  invoiceNoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 36,
  },
  invoiceDate: {
    marginTop: 5,
    fontSize: 9,
  },
  headerContainer: {
    marginTop: 24,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#bff0fd",
  },
  container: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    backgroundColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  description: {
    width: "60%",
    borderRightColor: "#bff0fd",
    borderRightWidth: 1,
  },
  qty: {
    width: "10%",
    borderRightColor: "#bff0fd",
    borderRightWidth: 1,
  },
  rate: {
    width: "15%",
    borderRightColor: "#bff0fd",
    borderRightWidth: 1,
  },
  amount: {
    width: "15%",
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 24,
    alignItems: "flex-end",
  },
});

// Create Document Component
const ArchivedProjectPDF = ({ project }) => {
  const items = useMemo(() => JSON.parse(project.itemData), [project]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image style={styles.logo} src="/pp_icon_transparent.png" />
        <View style={styles.invoiceNoContainer}>
          <Text>Invoice No: </Text>
          <Text>
            Event Date:{" "}
            {dayjs(project.eventDate, "DD/MM/YYYY").format("MMM DD, YYYY")}
          </Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.billTo}>Bill To:</Text>
          <Text>{project.customerPO}</Text>
          {/* ...more client details */}
        </View>
        {/* Invoice Items Table */}
        <View style={styles.tableContainer}>
          <View
            style={{ ...styles.container, ...{ backgroundColor: "#e1e1e1" } }}
          >
            <Text style={{ ...styles.description, ...styles.header }}>
              Item
            </Text>
            <Text style={{ ...styles.qty, ...styles.header }}>QTY</Text>
            <Text style={{ ...styles.amount, ...styles.header }}>Subtotal</Text>
          </View>
          {items.map((item) => (
            <View key={item.id} style={styles.row}>
              <Text style={styles.description}>{item.name}</Text>
              <Text style={styles.qty}>{item.quantity}</Text>
              <Text style={styles.amount}>
                ${item.sellUnitPrice * item.quantity}
              </Text>
            </View>
          ))}
        </View>
        {/* Summary Section */}
        <View style={styles.summaryContainer}>
          <Text>Subtotal: {project.subtotal}</Text>
          <Text>Total: {project.total}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ArchivedProjectPDF;
