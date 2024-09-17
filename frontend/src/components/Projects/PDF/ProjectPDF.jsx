import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";
import dayjs from "dayjs";
import moment from "moment";
import { useMemo } from "react";

const fixedPrice = (price) => price.toFixed(2) || "-";

// Define custom styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 11,
    lineHeight: 1.5,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionHeader: {
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
  },
  section: {
    marginBottom: 10,
  },
  lineItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    marginTop: 5,
    fontSize: 10,
    textAlign: "center",
  },
  logo: {
    height: 70,
    width: 140,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    borderBottomStyle: "solid",
    paddingBottom: 5,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
  },
  columnQuantity: {
    width: "10%",
    textAlign: "left",
  },
  columnDescription: {
    width: "50%",
    textAlign: "left",
  },
  columnUnitPrice: {
    width: "20%",
    textAlign: "right",
  },
  columnTotalPrice: {
    width: "20%",
    textAlign: "right",
  },
  itemProductionTime: {
    marginVertical: "2%",
    textAlign: "left",
    left: "10%",
  },
  itemSetup: {
    marginVertical: "2%",
    textAlign: "left",
    left: "10%",
  },
});
const today = moment().format("MM/DD/YYYY");
// Create Document Component
const ProjectPDF = ({ project }) => {
  const totalDue = useMemo(() => {
    const itemCost = project.Items.reduce(
      (acc, item) =>
        acc +
        item.sellUnitPrice * item.quantity +
        item.sellSetup * item.quantity,
      0
    );
    const shippingCost = project.Items.reduce(
      (acc, item) => acc + (item.shippingEstimate || 0),
      0
    );
    return itemCost + shippingCost;
  }, [project]);
  console.log("PROJECT: ", project);

  if (!project) return null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image
            src="/pp_horizontal_logo_transparent.png"
            style={styles.logo}
          />
          <View>
            <Text>Prime Promos LLC</Text>
            <Text>951 W. Harvard Pl</Text>
            <Text>Ontario, CA 91762</Text>
          </View>
        </View>

        {/* Billing and Shipping Information */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Bill to</Text>
            <Text>{project.billToName || "-"}</Text>
            <Text>{project.billToAddress || "-"}</Text>
            <Text>
              {project.billToCity || "-"}, {project.billToState || "-"}{" "}
              {project.billToZip || "-"}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Ship to</Text>
            <Text>{project.shipToName || "-"}</Text>
            <Text>{project.shipToAddress || "-"}</Text>
            <Text>
              {project.shipToCity || "-"}, {project.shipToState || "-"}{" "}
              {project.shipToZip || "-"}
            </Text>
          </View>
          <View style={styles.section}>
            <Text>Invoice No. {project.invoice}</Text>
            <Text>Date: {today}</Text>
            <Text>Terms: Due on receipt</Text>
            <Text>Customer P.O.: {project.customerPO}</Text>
            <Text>Vendor No. A429888</Text>
            <Text>Sales No. {project.salesConfirmation}</Text>
          </View>
        </View>

        {/* Line Items */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Items:</Text>

          <View style={styles.headerRow}>
            <Text style={styles.columnQuantity}>Quantity</Text>
            <Text style={styles.columnDescription}>Description</Text>
            <Text style={styles.columnUnitPrice}>Unit Price</Text>
            <Text style={styles.columnTotalPrice}>Total Price</Text>
          </View>
          {project.Items.map((item) => (
            <View key={item.id}>
              <View style={styles.lineItem}>
                <Text style={styles.columnQuantity}> {item.quantity}</Text>
                <Text style={styles.columnDescription}>{item.name}</Text>
                <Text style={styles.columnUnitPrice}>
                  ${item.sellUnitPrice?.toFixed(2) || "-"}
                </Text>
                <Text style={styles.columnTotalPrice}>
                  ${(item.sellUnitPrice * item.quantity)?.toFixed(2) || "-"}
                </Text>
              </View>
              <View>
                <Text style={styles.itemProductionTime}>
                  Note: production around {item.productionTime}
                </Text>
              </View>
              <View style={styles.lineItem}>
                <Text style={styles.columnQuantity}></Text>
                <Text style={styles.columnDescription}>Setup Charge</Text>
                <Text style={styles.columnUnitPrice}>
                  ${item.sellSetup?.toFixed(2) || "-"}
                </Text>
                <Text style={styles.columnTotalPrice}>
                  ${(item.sellSetup * item.quantity)?.toFixed(2) || "-"}
                </Text>
              </View>
              <View style={styles.lineItem}>
                <Text style={styles.columnQuantity}></Text>
                <Text style={styles.columnDescription}>Shipping Charge</Text>
                <Text style={styles.columnUnitPrice}></Text>
                <Text style={styles.columnTotalPrice}>
                  ${item.shippingEstimate || "-"}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            borderTopWidth: 1,
            borderTopColor: "#000000",
            borderTopStyle: "solid",
            paddingBottom: 5,
            marginBottom: 5,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <View style={{ marginTop: "5px" }}>
            <Text style={styles.footer}>
              Pricing is based on your check payment.
            </Text>
            <Text style={styles.footer}>
              Otpion to pay by Credit Card adds 3% to the toal.
            </Text>
            <Text style={styles.footer}>
              Your order is appreciated - thank you!
            </Text>
            <Text style={styles.footer}>
              orders@prime-promos.com | 909.815.5162
            </Text>
          </View>
          <View style={{ margin: 0 }}>
            <Text
              style={{
                fontSize: "15px",
                marginTop: "10px",
                marginRight: "15px",
                marginBottom: "5px",
                borderBottom: "1px solid black",
              }}
            >
              Balance Due
            </Text>
            <Text>${totalDue?.toFixed(2) || "-"}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ProjectPDF;
