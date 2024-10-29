import { Card } from "react-bootstrap";

export default function Home() {
  return (
    <div id="home">
      <div
        className="w-100 overflow-hidden hero-banner d-flex
        align-items-center justify-content-evenly"
      >
        <Card>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>Strategies for card games like Poker, Bridge, and Hearts.</Card.Text>
          </Card.Body>
        </Card>
        <div></div>
        <div></div>
      </div>

      <p>
        This is a collection of strategies for various games, including card games, board games, and
        video games.
      </p>
    </div>
  );
}
