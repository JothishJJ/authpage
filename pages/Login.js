import { Form, Button, Card, Container, Alert } from "react-bootstrap";

import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useRef, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { useAuth } from "../lib/AuthContext";

import Loading from "../lib/Loading";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [user, loadingAuth] = useAuthState(auth);

  if (user) {
    Router.push("/");
    return <Loading />;
  }

  if (loadingAuth) {
    return <Loading />;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      Router.push("/");
    } catch {
      setError("Failed to sign in");
    }

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Log In</title>
      </Head>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center md-4">Log In</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <br />
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <br />
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-100"
                  variant="success"
                >
                  Log In
                </Button>
              </Form>
              {error && (
                <>
                  <br />
                  <Alert variant="danger">{error}</Alert>
                </>
              )}
              <div className="w-100 text-center mt-3">
                <Link href="/forgot-password">Forgot Password?</Link>
              </div>
              <div className="w-100 text-center mt-2">
                Don&#39;t have an account? <Link href="/Signup">Sign Up</Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
