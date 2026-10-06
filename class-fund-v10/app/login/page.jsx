const submit = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true);
    
    try {
      // 1. Gửi request đăng nhập (cookie token đã được set chuẩn ở API)
      await apiFetch("/api/auth/login", { method: "POST", body: { email, password } });
      
      // 2. Ép trình duyệt chuyển hướng cứng ngay lập tức sang dashboard
      window.location.href = "/dashboard";
      
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại");
      setLoading(false); // Chỉ tắt loading khi có lỗi xảy ra
    }
  };