import './Styles.css'
import react, {useEffect, useState} from 'react'
import Button from './Components/Button';
import Checkbox from './Components/Checkbox';

function App() {

  const [length, setLength] = useState(4);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('medium');
  const [copied, setCopied] = useState(false);


  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 10000);
  };

  const generatePassword = async () => {
    console.log(strength, length)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/generate-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ strength, length })
      });
      const data = await response.json();
      setPassword(data.password);
      console.log(data.password)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container">
      <div className='top-row'>
      <h1 style={{ fontFamily: 'cursive', fontWeight: 'bolder', color: 'white', textAlign: 'center' , fontSize:'40px'}}>Instantly generate a secure, random password with our online tool.</h1>
    </div>
    <div className='bottom-row'>
    <div className="instructions-container">
      <div className="instructions">
        <h2>Generate Secure Passwords</h2>
        <ol>
          <li>Adjust Length: Slide to set password length.</li>
          <li>Select Strength: Choose password complexity.</li>
          <li>Generate: Click to create password.</li>
          <li>Copy: Save password to clipboard.</li>
          <li>Regenerate: Create new password.</li>
        </ol>
        <p>Remember: Keep passwords unique and secure. Avoid common phrases and update regularly.</p>
      </div>
    </div>
    <div className="password-section">
      
      {password && (
        <div>
        <h3 style={{color:'white'}}>Generated Password</h3>
        <div className="password">
        <div className="header">
          <div className="title">{password}</div>
          <Button
            text={copied ? "Copied" : "Copy"}
            onClick={handleCopy}
            customClass="copyBtn"
          />
        </div>
      </div>
      </div>
      )}
      
      <div className="charlength">
        <span>
          <label>Password Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
        />
      </div>
      
      <div className="checkboxes">
        <Checkbox
          title="Weak"
          state={strength === 'weak'}
          onChange={() => setStrength('weak')}
        />
        <Checkbox
          title="Medium"
          state={strength === 'medium'}
          onChange={() => setStrength('medium')}
        />
        <Checkbox
          title="Strong"
          state={strength === 'strong'}
          onChange={() => setStrength('strong')}
        />
      </div>
      
      <Button
        text="Generate Password"
        onClick={generatePassword}
        customClass="generateBtn"
      />
    </div>
    </div>
  </div>
  );
}

export default App;
