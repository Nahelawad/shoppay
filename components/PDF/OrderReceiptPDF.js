import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica"
  },
  section: { marginBottom: 12 },
  header: { fontSize: 16, marginBottom: 20, textAlign: "center" },
  bold: { fontWeight: "bold" },
  productRow: { flexDirection: "row", justifyContent: "space-between" },
  tableHeader: {
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 5,
    fontWeight: "bold"
  }
});

export default function OrderRecieptPDF({ order }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Order Receipt</Text>

        <View style={styles.section}>
          <Text>Order ID: {order._id}</Text>
          <Text>Date: {new Date(order.createdAt).toLocaleDateString()}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>Customer Details</Text>
          <Text>{order.user.name}</Text>
          <Text>{order.user.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>Shipping Address</Text>
          <Text>
            {order.shippingAddress.firstName} {order.shippingAddress.lastName}
          </Text>
          <Text>{order.shippingAddress.address1}</Text>
          {order.shippingAddress.address2 && (
            <Text>{order.shippingAddress.address2}</Text>
          )}
          <Text>
            {order.shippingAddress.city}, {order.shippingAddress.state}
          </Text>
          <Text>
            {order.shippingAddress.zipCode}, {order.shippingAddress.country}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>Ordered Products</Text>

          <View style={styles.tableHeader}>
            <Text style={styles.productRow}>
              <Text>Product</Text>
              <Text>Qty x Price = Total</Text>
            </Text>
          </View>

          {order.products.map((product, index) => (
            <Text style={styles.productRow} key={index}>
              <Text>
                {product.name.length > 25
                  ? product.name.substring(0, 25) + "..."
                  : product.name}
              </Text>
              <Text>
                {product.qty} x £{product.price} = £
                {(product.qty * product.price).toFixed(2)}
              </Text>
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>Order Summary</Text>
          {order.couponApplied && (
            <>
              <Text>Subtotal: £{order.totalBeforeDiscount.toFixed(2)}</Text>
              <Text>
                Coupon ({order.couponApplied}): -£
                {(order.totalBeforeDiscount - order.total).toFixed(2)}
              </Text>
            </>
          )}
          <Text>Tax: £{order.taxPrice.toFixed(2)}</Text>
          <Text style={{ marginTop: 5, fontSize: 14, fontWeight: "bold" }}>
            Total: £{order.total.toFixed(2)}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
