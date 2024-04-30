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

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    margin: 10,
    fontSize: 14,
    textAlign: "left",
  },
  boldText: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 25,
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
