import { Link } from 'react-router-dom';
import { Button, Image, List } from 'semantic-ui-react';

const Admin = () => {
  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <p>You must have been assigned an Admin role.</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
      <List divided verticalAlign="middle">
        <List.Item>
          <List.Content floated="right">
            <Button>Add</Button>
          </List.Content>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/lena.png"
          />
          <List.Content>Lena</List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated="right">
            <Button>Add</Button>
          </List.Content>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/lindsay.png"
          />
          <List.Content>Lindsay</List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated="right">
            <Button>Add</Button>
          </List.Content>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/mark.png"
          />
          <List.Content>Mark</List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated="right">
            <Button>Add</Button>
          </List.Content>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/molly.png"
          />
          <List.Content>Molly</List.Content>
        </List.Item>
      </List>
    </section>
  );
};

export default Admin;
