import React from "react"
import { Row } from "react-bootstrap"
import Table from 'react-bootstrap/Table'

const HowtoTable = (props) => {
  let howtos = props.howtos
  return (
    <>
      {howtos.length !== 0 && (
        <React.Fragment>
          <Row>
            {/* Header */}
            <h2 className="mt4">
              How Tos
            </h2>

            {/* Table */}
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {howtos.map(({ node }) => (
                    <tr>
                      <td><a href={node.link} target="_blank" rel="noopener noreferrer">{node.title}</a></td>
                      <td>{node.description}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
          </Row>
        </React.Fragment>
      )}
    </>
  )
}
export default HowtoTable
