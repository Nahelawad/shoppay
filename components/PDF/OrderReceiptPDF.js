import React from "react";

import { Page,Text,View,Document,StyleSheet, pdf } from "@react-pdf/renderer";


const styles=StyleSheet.create({
    page:{
        padding:30,
        fontSize:14,
        fontFamily:"Helvetica"
    },
    section:{marginBottom:10},
    header:{fontSize:16,marginBottom:20},
    bold:{fontWeight:"bold"}
});


export default function OrderRecieptPDF({order}){
    
    return(
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.header}>Order Reciept</Text>

                <View style={styles.section}>
                    <Text>Order ID:{order._id}</Text>
                    <Text>Date: {new Date(order.createdAt).toLocaleDateString()}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.bold}> Customer Details </Text>
                    <Text>{order.user.name}</Text>
                    <Text>{order.user.email}</Text>
                </View>

        <View style={styles.section}>
          <Text style={styles.bold}>Shipping Address</Text>
          <Text>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</Text>
          <Text>{order.shippingAddress.address1}</Text>
          {order.shippingAddress.address2 && <Text>{order.shippingAddress.address2}</Text>}
          <Text>{order.shippingAddress.city}, {order.shippingAddress.state}</Text>
          <Text>{order.shippingAddress.zipCode}, {order.shippingAddress.country}</Text>
        </View>


            </Page>
        </Document>
    )

}


