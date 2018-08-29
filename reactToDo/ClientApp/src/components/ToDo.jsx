import React from 'react';
import { AlertService } from '../services/AlertService';
import { v4 } from 'uuid';
import { HttpService } from '../services/HttpService';
import { UserService } from '../services/UserService';

export class ToDo extends React.Component {
    displayName = ToDo.name
    userId = UserService.info().UserId;

    constructor(props) {
        super(props);

        this.state = { todoItems: [], loading: true };
        this.add = this.add.bind(this);
        this.load();
    }
    
    add() {
        let newGuid = v4();
        this.setState({ todoItems: [...this.state.todoItems, { id: newGuid, name: '' }]});
    }

    async load() {
        HttpService.get(`api/ToDo/GetItems/`).then((response) => {
            if (!response.error && response.data) {
                this.setState({ todoItems: response.data, loading: false });
            } else {
                AlertService.error(response.data.error);
            }
        });
    }

    async save(finditem) {
        return HttpService.post(`/api/ToDo/Save`, finditem)
            .then((response) => {
                if (!response.error) {
                    AlertService.save('Saved');
                } else {
                    AlertService.error(response.data.error);
                }
                return response;
            });
    }

    delete(item) {
        
        let finditem = this.state.todoItems.find(x => x.id === item.id);
        finditem.isDeleted = true;

        HttpService.post(`/api/ToDo/Delete`, item)
            .then((response) => {
                if (!response.error) {
                    AlertService.save('Deleted');

                    let index = this.state.todoItems.map(x => x.id).indexOf(item.id);
                    console.log(this.state.todoItems);
                    this.state.todoItems.splice(index, 1)

                    this.setState({ todoItems: this.state.todoItems });
                } else {
                    AlertService.error(response.data.error);
                }
            });
    }

    async handleBlur(event) {

        let finditem = this.state.todoItems.find(x => x.id === event.currentTarget.id);
        let newName = String.prototype.trim.call(event.currentTarget.value);

        if (finditem.name === newName) return;

        finditem.name = newName;

        let response = await this.save(finditem);
        if (!response.error) {
            this.setState({ todoItems: this.state.todoItems });
        }
    }

    handleFocus(event) {
        event.target.select();
    }

    renderItems = (todoItems) => {
        return (
            <div className="todo-items">
                <button onClick={this.add}>add</button>
                <div>
                    {todoItems.map((item) =>
                        <div className="item" key={item.id}>
                            <input
                                id={item.id}
                                type="text"
                                defaultValue={item.name}
                                onBlur={this.handleBlur.bind(this)}
                                onFocus={this.handleFocus.bind(this)}
                                autoFocus="true"
                            />
                            <span className="item-delete" onClick={this.delete.bind(this, item)}>X</span>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h1>ToDo:</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {this.state.loading ? <p><em>Loading...</em></p> : this.renderItems(this.state.todoItems)}
            </div>
        );
    }
}