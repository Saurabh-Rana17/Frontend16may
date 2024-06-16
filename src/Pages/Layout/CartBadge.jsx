import { Badge, IconButton, Tooltip } from "@mui/material";
import React, { useContext } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../store/StateProvider";

export default function CartBadge() {
  const navigate = useNavigate();
  const { cartState } = useContext(CartContext);
  return (
    <Tooltip title="Cart">
      <IconButton
        onClick={() => navigate("/cart")}
        sx={{ marginRight: "1rem" }}
      >
        <Badge color="primary" badgeContent={cartState.total}>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
}
