import { Avatar, Button, Group, Indicator, Menu, Text } from "@mantine/core";
import {
  IconChevronDown,
  IconLogout,
  IconSettings,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";

import { SearchBar } from "./SearchBar";
import { ThemeToggler } from "./ThemeToggler";
import { useCart } from "../cart/hooks/useCart";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { data: cart } = useCart();
  const cartItemCount = cart?.totalQuantity ?? 0;

  return (
    <Group
      justify="space-between"
      p="md"
      style={{ borderBottom: "1px solid #e9ecef" }}
    >
      <Text
        size="xl"
        fw={700}
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        E-Commerce Store
      </Text>

      <SearchBar />

      <Group>
        <ThemeToggler />
        <Indicator
          label={cartItemCount}
          size={16}
          color="red"
          position="middle-start"
          disabled={cartItemCount === 0}
        >
          <Button
            variant="subtle"
            leftSection={<IconShoppingCart size={18} />}
            onClick={() => navigate("/cart")}
          >
            Cart
          </Button>
        </Indicator>

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button
              variant="subtle"
              rightSection={<IconChevronDown size={16} />}
            >
              <Group gap="xs">
                <Avatar src="" alt="User" size="sm" />
                <Text size="sm">
                  {isAuthenticated ? user?.username : "Guest"}
                </Text>
              </Group>
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Account</Menu.Label>
            <Menu.Item
              leftSection={<IconSettings size={16} />}
              onClick={() => navigate("/settings")}
            >
              Settings
            </Menu.Item>
            <Menu.Divider />
            {isAuthenticated ? (
              <Menu.Item
                leftSection={<IconLogout size={16} />}
                color="red"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Logout
              </Menu.Item>
            ) : (
              <Menu.Item onClick={() => navigate("/login")}>Login</Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
};
