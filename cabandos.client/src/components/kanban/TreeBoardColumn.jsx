import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import BoardColumn from './BoardColumn';

class TreeBoardColumn extends Component {
    renderTreeNode(treeNode) {
        const { handleMoveTask, handleDeleteTask, handleAddTask } = this.props;

        if (!treeNode.isLeaf) {
            return (
                <Row
                    key={treeNode.status}
                    className="justify-content-center"
                    style={{
                        flexWrap: 'wrap'
                    }}
                >
                    {treeNode.tasks.map((node) => (
                        this.renderTreeNode(node)
                    ))}
                </Row>
            );
        } else {
            return (
                <Col md={12} key={treeNode.status}>
                    <BoardColumn
                        onMoveTask={handleMoveTask}
                        onDeleteTask={handleDeleteTask}
                        onAddTask={handleAddTask}
                        taskItem={treeNode}
                    />
                </Col>
            );
        }
    }

    render() {
        const { treeNode } = this.props;
        return this.renderTreeNode(treeNode);
    }
}

export default TreeBoardColumn;
