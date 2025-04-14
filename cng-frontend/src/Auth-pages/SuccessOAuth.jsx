
import { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import {jwtDecode} from 'jwt-decode'; // ✅ import decoder

export default function OAuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser  } = useContext(AuthContext); // ✅ use setUser to update context

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      try {
        
        const decoded = jwtDecode(token); // this gives { id, name, email, ... }

        const userData = {
          _id: decoded._id,
          role: decoded.role,
          googleId : decoded.googleId,
          token:token
        }

        localStorage.setItem("user", JSON.stringify(userData));

        setUser(decoded);

        navigate("/");
      } catch (err) {
        console.error("Invalid Token:", err);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate, searchParams, setUser]);

  return <p>Logging you in...</p>;
}
