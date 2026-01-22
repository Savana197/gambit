"use client"
import Link from "next/link"
import styles from "./nav-bar.module.css"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useActionState, useEffect, useState } from "react";
import { login, logout, register } from "@/lib/actions";
import {  fetchUserWithId } from "@/lib/users";
import { Role } from "@/generated/prisma/enums";


export default function NavBar({ userId }) {
    const [loginState, loginAction] = useActionState(login, { message: '' })
    const [registerState, registerAction] = useActionState(register, undefined)

    const [state, setState] = useState('login');
    const [wholeUser, setWholeUser] = useState(null);
    const pathName = usePathname();

    const searchParams = useSearchParams();
    const router = useRouter();
    useEffect(() => {
        async function getUser(){
            const data = await fetchUserWithId(userId)
            setWholeUser(data);
        }
        getUser()
    }, [userId]);
    useEffect(() => {
        if (searchParams.get("login") === "true") {
            const modalEl = document.getElementById("loginModal");
            if (!modalEl) return;

            const bs = window?.bootstrap;
            if (bs?.Modal) {
                const modal = new bs.Modal(modalEl);
                modal.show();

                router.replace("/home");
            }
        }
    }, [searchParams]);

    

    function hideModal() {
        const modalEl = document.getElementById("loginModal");
        if (!modalEl) return;

        const bs = window?.bootstrap;
        if (bs?.Modal) {
            const inst = bs.Modal.getInstance(modalEl) || new bs.Modal(modalEl);
            inst.hide();
            return;
        }
    }
    useEffect(() => {
        if (state === 'register') {
            const regSuccess = registerState && !registerState.errors && registerState.success && userId;
            if (regSuccess) {
                hideModal();
                router.refresh();
            }
        } else {
            const logSuccess = loginState && !loginState.errors && loginState.success;
            if (logSuccess) {
                hideModal();
                router.refresh();
            }
        }
    }, [state, registerState, loginState])

    function handleLoginClick(e) {
        e.preventDefault();
        setState('login')
    }


    return (
        <>
            <nav className={`navbar navbar-dark navbar-expand-md fixed-top ${styles.navBar}`}>
                <div className="container-fluid navContainer" >
                    <Link href="/" className={`navbar-brand ${styles.navContainer}`}>
                        <img src="/icon.png" alt="Logo" width="50" height="50" className="d-inline-block align-text-top" />
                        <h2>Gambit</h2>
                    </Link>
                    <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className='collapse navbar-collapse' id="navbarNav">
                    <ul className={`navbar-nav ${styles.navBarItem}`}>
                        {wholeUser?.role===Role.ADMIN &&
                        <li className="nav-item">
                            <Link className={`nav-link ${pathName === '/users' ? styles.linkActive : ""}`} aria-current="page" href="/users"><h3>Users</h3></Link>
                        </li>
                        }
                        <li className="nav-item">
                            <Link className={`nav-link ${pathName === '/home' ? styles.linkActive : ""}`} aria-current="page" href="/home"><h3>Home</h3></Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${pathName === '/news' ? styles.linkActive : ""}`} aria-current="page" href="/news"><h3>News</h3></Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${pathName === '/openings' ? styles.linkActive : ""}`} aria-current="page" href="/openings"><h3>Openings</h3></Link>
                        </li>
                        <li className="nav-item">
                            {userId ? (
                                <button
                                    onClick={async () => {
                                        setWholeUser(null)
                                        await logout();
                                        router.refresh();
                                    }}
                                    className="nav-link btn btn-link"
                                >
                                    <h3>Logout</h3>
                                </button>
                            ) : (
                                <a
                                    className={`nav-link`}
                                    href="#"
                                    role="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#loginModal"
                                    onClick={handleLoginClick}
                                >
                                    <h3>Login</h3>
                                </a>)}
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="modal fade" id="loginModal" tabIndex={-1} aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            {state === "login" ?
                                <h5 className="modal-title" id="loginModalLabel">Login</h5>
                                :
                                <h5 className="modal-title" id="loginModalLabel">Register</h5>}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="form" action={state === "login" ? loginAction : registerAction}>
                                {state === "login" ?
                                loginState?.errors?.server && loginState.errors.server
                            :
                                registerState?.errors?.server && registerState.errors.server
                            }

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" required />
                                    {state === "register" && registerState?.errors?.email && (
                                        <p className="text-danger">{registerState.errors.email}</p>
                                    )}
                                    {state === "login" && loginState?.errors?.email && (
                                        <p className="text-danger">{loginState.errors.email}</p>
                                    )}
                                </div>

                                {state === "register" &&
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input type="text" className="form-control" id="username" name="username" required />
                                        {registerState?.errors?.username && registerState.errors.username.map((err, i) => (
                                            <p key={i} className="text-danger">{err}</p>
                                        ))}
                                    </div>
                                }

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" required />
                                    {state === "register" && registerState?.errors?.password && registerState.errors.password.map((err, i) => (
                                        <p key={i} className="text-danger">{err}</p>
                                    ))}

                                    {state === "login" && loginState?.errors?.password && (
                                        <p className="text-danger">{loginState.errors.password}</p>
                                    )}
                                </div>


                                {state === 'register' &&
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
                                        <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" required />
                                        {registerState?.errors?.confirmPassword && <p className="text-danger">{registerState.errors.confirmPassword}</p>}
                                    </div>
                                }
                                {state === "login" && loginState.message != '' && <p className="text-danger">{loginState.message}</p>}

                                {state === "login" ?
                                    <div className="mb-3">
                                        <button className="btn btn-link w-100 text-center p-0" type="button" onClick={() => setState('register')}>
                                            Don't have an account? Register now!
                                        </button>
                                    </div> :
                                    <div className="mb-3">
                                        <button className="btn btn-link w-100 text-center p-0" type="button" onClick={() => setState('login')}>
                                            Login with an existing account
                                        </button>
                                    </div>
                                }

                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                            {state === "login" ?
                                <button type="submit" form="form" className="btn btn-secondary">Login</button>
                                :
                                <button type="submit" form="form" className="btn btn-secondary">Register</button>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}