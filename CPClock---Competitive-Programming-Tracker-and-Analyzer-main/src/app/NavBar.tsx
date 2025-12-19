"use client";

import Link from "next/link";
import { Container, Navbar, Nav } from "react-bootstrap";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname(); // it is a router hook in the app router/directory

    return (
        <Navbar bg="primary" variant="dark" sticky="top" expand="sm" collapseOnSelect>
            <Container>
                <Navbar.Brand as={Link} href="/">My CPClock</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} href="/login" active={pathname==="/login"}>Login</Nav.Link>
                        <Nav.Link as={Link} href="/profile" active={pathname==="/profile"}>Profile</Nav.Link>
                        <Nav.Link as={Link} href="/contests" active={pathname==="/contests"}>Contests</Nav.Link>
                        <Nav.Link as={Link} href="/practice" active={pathname==="/practice"}>Practice</Nav.Link>
                        <Nav.Link as={Link} href="/theory" active={pathname==="/theory"}>Theory</Nav.Link>
                        <Nav.Link as={Link} href="/thankyou" active={pathname==="/thankyou"}>About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}