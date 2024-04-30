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
    marginTop: 20,
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
});

// Create Document Component
const ProjectPDF = ({ project }) => {
  return (
    <PDFViewer style={{ width: "100%", height: "45rem" }}>
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
              <Text>Citrus Community College District</Text>
              <Text>1000 W. Foothill Blvd.</Text>
              <Text>Glendora, CA 91741</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Ship to</Text>
              <Text>Citrus College District Warehouse</Text>
              <Text>Ashley G, Guided Pathways P0017073</Text>
              <Text>1000 W. Foothill Blvd.</Text>
              <Text>Glendora, CA 91741</Text>
            </View>
            <View style={styles.section}>
              <Text>Invoice No. </Text>
              <Text>Date: </Text>
              <Text>Terms: Due on receipt</Text>
              <Text>Customer P.O.: {project.customerPO}</Text>
              <Text>Vendor No. A429888</Text>
              <Text>Sales No. {project.salesConfirmation}</Text>
            </View>
          </View>

          {/* Line Items */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Items:</Text>
            {/* <View style={{ flexDirection: "column" }}> */}
            <View style={styles.headerRow}>
              <Text style={styles.columnQuantity}>Quantity</Text>
              <Text style={styles.columnDescription}>Description</Text>
              <Text style={styles.columnUnitPrice}>Unit Price</Text>
              <Text style={styles.columnTotalPrice}>Total Price</Text>
            </View>
            {project.Items.map((item) => (
              <View key={item.id} style={styles.lineItem}>
                <Text style={styles.columnQuantity}> {item.quantity}</Text>
                <Text style={styles.columnDescription}>{item.name}</Text>
                <Text style={styles.columnUnitPrice}>
                  ${item.sellUnitPrice}
                </Text>
                <Text style={styles.columnTotalPrice}>
                  ${item.sellUnitPrice * item.quantity}
                </Text>
              </View>
            ))}
          </View>
          {/* More items can be added similarly */}
          {/* </View> */}

          <Text style={styles.footer}>
            Your order is appreciated - thank you! - orders@prime-promos.com |
            909.815.5162
          </Text>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default ProjectPDF;
