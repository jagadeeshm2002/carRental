export const verifyRole = (role: string) => {
  return (req: any, res: any, next: any) => {
    console.log(req.user.role, role);
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
