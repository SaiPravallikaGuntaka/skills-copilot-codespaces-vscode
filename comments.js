// Create Basic react component
// Import React
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Import Material UI
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';

// Create Comments Component
class Comments extends React.Component {

    // Create state
    state = {
        comments: ''
    }

    // Create handleChange function
    handleChange = (event) => {
        this.setState({
            comments: event.target.value
        })
    }

    // Create handleSubmit function
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_COMMENTS', payload: this.state.comments })
        this.props.history.push('/review');
    }

    // Render
    render() {
        return (
            <div>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Any comments you want to leave?
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" onChange={this.handleChange} />
                            <Button type="submit" variant="contained" color="primary">Next</Button>
                        </form>
                    </CardActions>
                </Card>
            </div>
        )
    }
}