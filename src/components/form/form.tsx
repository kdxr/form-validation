import { FormEvent, useRef, useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import "./style.scss";

type Props = {};

interface RefType {
	readonly wrapperElement: HTMLDivElement;
	readonly inputElement: HTMLInputElement;
	smallElement: HTMLSpanElement;
}

const salt = bcrypt.genSaltSync(10);

export default function From({}: Props) {
	const [userName, setUserName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setCofirmPassword] = useState<string>("");

	const useNameErrorMsg = useRef<RefType["smallElement"]>(null);
	const emailErrorMsg = useRef<RefType["smallElement"]>(null);
	const passwordErrorMsg = useRef<RefType["smallElement"]>(null);
	const confirmPasswordErrorMsg = useRef<RefType["smallElement"]>(null);

	useEffect(() => {
		if (useNameErrorMsg?.current) {
			if (userName !== "" && userName.length < 8) {
				useNameErrorMsg.current.textContent =
					"กรุณากรอกชื่อผู้ใช้มากกว่า 8 ตัวอักษร";
			} else useNameErrorMsg.current.textContent = null;
		}
	}, [userName]);

	useEffect(() => {
		if (emailErrorMsg?.current) {
			if (email !== "" && !email.includes("@")) {
				emailErrorMsg.current.textContent = "รูปแบบ Email ไม่ถูกต้อง";
			} else emailErrorMsg.current.textContent = null;
		}
	}, [email]);

	useEffect(() => {
		if (passwordErrorMsg?.current) {
			if (password !== "" && password.length < 8) {
				passwordErrorMsg.current.textContent = "รหัสผ่านต้องมีอย่างน้อย 8";
			} else passwordErrorMsg.current.textContent = null;
		}
	}, [password]);

	useEffect(() => {
		if (confirmPasswordErrorMsg?.current) {
			if (confirmPassword !== "" && password !== confirmPassword) {
				confirmPasswordErrorMsg.current.textContent = "รหัสผ่านไม่ตรงกัน";
			} else confirmPasswordErrorMsg.current.textContent = null;
		}
	}, [confirmPassword]);

	const submit = (e: FormEvent) => {
		e.preventDefault();
		alert(
			`Register Success \`${userName}\` as Email \`${email}\` Password \`${bcrypt.hashSync(
				password,
				salt
			)}\``
		);

		setUserName("");
		setEmail("");
		setPassword("");
		setCofirmPassword("");
	};

	return (
		<div className="container">
			<form className="form" onSubmit={submit}>
				<h2>แบบฟอร์มลงทะเบียน</h2>
				<div className="form-control">
					<label>ชื่อผู้ใช้</label>
					<input
						type={"text"}
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
					/>
					<small ref={useNameErrorMsg}></small>
				</div>
				<div className="form-control">
					<label>อีเมล</label>
					<input
						type={"text"}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<small ref={emailErrorMsg}></small>
				</div>
				<div className="form-control">
					<label>รหัสผ่าน</label>
					<input
						type={"password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<small ref={passwordErrorMsg}></small>
				</div>
				<div className="form-control">
					<label>ยืนยันรหัสผ่าน</label>
					<input
						type={"password"}
						value={confirmPassword}
						onChange={(e) => setCofirmPassword(e.target.value)}
					/>
					<small ref={confirmPasswordErrorMsg}></small>
				</div>
				<button type="submit">ยืนยัน</button>
			</form>
		</div>
	);
}
