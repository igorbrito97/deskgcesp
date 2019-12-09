import React from 'react';
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";
import logoHeader from "assets/img/gcesp/header.png";
import {
    Table,
    TableHeader,
    TableBody,
    DataTableCell,
    TableCell
} from "@david.kucsai/react-pdf-table";

const styles = StyleSheet.create({
    header: {
        display: 'row',
        alignContent: "center",
        padding: 10,
        textAlign: "center",
    },
    imageHeader: {
        padding: 15,
        height: 330,
        width: 1395,
    },
    reportTitle: {
        fontSize: 20,
        fontFamily: 'Helvetica',
        fontWeight: 800
    },
    reporSubtitle: {
        fontSize: 16,
        fontFamily: 'Helvetica'
    },
    tableHeader: {
        fonsize: 18,
        textAlign: "center"
    }
    // tableRow: {
    //     fontFamily: 'Times-Roman',
    //     fontSize: 14
    // }
})

export function PdfDocument(props) { 
    console.log('porps',props);
    return (
        <Document>
            <Page size="A4">
                <View style={styles.header}>
                    <Image
                        source={logoHeader}
                        fixed
                    />
                    <Text style={styles.reportTitle}>
                        Relatório de {props.report.label}
                    </Text>
                    {
                        (props.searchedCap!==null || props.searchedFilter!== null || props.searchedStatus!== null) &&
                        <Text style={styles.reporSubtitle}>
                            Filtro - 
                            {props.searchedCap!==null ? ' Capítulo: ' + props.searchedCap.cap_nome : null}
                            {props.searchedFilter!==null ? ' Texto: ' + props.searchedFilter : null}
                            {props.searchedStatus!==null ? ' Status: ' + props.searchedStatus : null}
                        </Text>
                    }
                </View>
                <Table data={props.data}>
                    <TableHeader>
                    {
                        props.report && props.report.columns &&
                        props.report.columns.map((item,index) => {
                            return (
                                <TableCell styles={styles.tableHeader} key={index}>{item}</TableCell>
                            );
                        })
                    }
                    </TableHeader>
                    {
                      props.report.value === 'topicoArea' ?
                      <TableBody>
                        <DataTableCell getContent={(r) => r.area.areaforum_nome} />
                        <DataTableCell getContent={(r) => r.qntdTopicos + ''} />
                      </TableBody>
                      : props.report.value === 'ticketArea' ? 
                      <TableBody>
                        <DataTableCell getContent={(r) => r.area.areaticket_nome} />
                        <DataTableCell getContent={(r) => r.qntdTickets + ''} />
                      </TableBody>
                      : props.report.value === 'docEleitoral' ?
                      <TableBody>
                        <DataTableCell getContent={(r) =>
                          r.capitulo.cap_nome + ' n° '+ r.capitulo.cap_numero
                         } />
                        <DataTableCell getContent={(r) => r.capitulo.cap_cidade} />
                        <DataTableCell getContent={(r) => r.data} />
                        <DataTableCell getContent={(r) => r.status} />
                      </TableBody>
                      : props.report.value === 'regInterno' ?
                      <TableBody>
                        <DataTableCell getContent={(r) => 
                        r.capitulo.cap_nome + ' n° '+ r.capitulo.cap_numero
                        } />
                        <DataTableCell getContent={(r) => r.capitulo.cap_cidade} />
                        <DataTableCell getContent={(r) => r.data} />
                        <DataTableCell getContent={(r) => r.status} />
                      </TableBody>
                      : props.report.value === 'chevalier' ?
                      <TableBody>
                        <DataTableCell getContent={(r) => r.nome} />
                        <DataTableCell getContent={(r) => 
                        r.capitulo.cap_nome + ' n° '+ r.capitulo.cap_numero 
                        } />
                        <DataTableCell getContent={(r) => r.dataEnvio} />
                        <DataTableCell getContent={(r) => r.status} />
                      </TableBody>
                      : props.report.value === 'downloads' ?
                      <TableBody>
                        <DataTableCell getContent={(r) => r.nome} />
                        <DataTableCell getContent={(r) => r.downloaded + ''} />
                      </TableBody>
                      : props.report.value === 'curso' ?
                      <TableBody>
                        <DataTableCell getContent={(r) => r.titulo} />
                        <DataTableCell getContent={(r) => r.status} />
                        <DataTableCell getContent={(r) => r.inscritos + ''} />
                      </TableBody>
                      : 
                      <TableBody></TableBody>

                    }
                </Table>
            </Page>
        </Document>
    );  
}
