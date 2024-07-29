"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const LoadingLink = ({ href, children, ...props }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    router.push(href);
  };

  useEffect(() => {
    if (loading && window.location.href.endsWith(href)) {
      setLoading(false);
    }
  }, [loading, href]);

  if (loading) {
    <Loader />;
  }

  return (
    <Provider store={store}>
      <Link href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    </Provider>
  );
};

export default LoadingLink;
