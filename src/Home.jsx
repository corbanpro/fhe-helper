import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeroFrame from "./assets/HeroFrame.jpg";
import { RocketTakeoffFill } from "react-bootstrap-icons";

export default function Home() {
  return (
    <div
      className="w-100 overflow-hidden hero-banner-bg d-flex
      position-absolute top-0 align-items-center justify-content-evenly"
    >
      <Card style={{ maxWidth: "35rem" }} className="mx-3 rounded-4 position-relative z-2">
        <Card.Body className="p-4">
          <Card.Title className="fs-1 mb-3">Gather&Grow</Card.Title>
          <hr />
          <div className="fs-5">
            <p>
              Welcome to <strong>Gather&Grow</strong>! If you've ever struggled to come up with
              ideas for Family Home Evening, you're in the right place!
            </p>
            <p>
              Families don't always fit the mold and can take many different shapes and sizes. Your
              plans for FHE should be as unique as your circumstances! Get started and find the
              perfect FHE plan for <strong>your</strong> family.
            </p>
            <div className="mt-3">
              <Link to="/get-started">
                <Button variant="primary" size="lg">
                  Plan the Perfect FHE <RocketTakeoffFill />
                </Button>
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
      <div className="d-flex justify-content-center align-items-center">
        <div className="position-absolute">
          <img src={HeroFrame} alt="" className="rounded rounded-4" style={{ width: "60rem" }} />
        </div>
      </div>
      <div></div>
    </div>
  );
}
