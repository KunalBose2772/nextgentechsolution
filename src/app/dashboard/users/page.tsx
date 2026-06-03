"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserPlus, Shield, Crown, MapPin, Phone, Megaphone } from "lucide-react";
import PageHeader from "@/components/crm/shared/PageHeader";
import type { CRMUser, UserRole } from "@/types/crm";

const SURFACE_STYLE = {
  background: "var(--crm-surface)",
  border: "1px solid var(--crm-border)",
  boxShadow: "var(--crm-shadow-sm)",
};

const ROLE_ICONS: Record<UserRole, React.ElementType> = {
  superadmin: Crown, admin: Shield, telecaller: Phone,
  field_sales: MapPin, marketing: Megaphone,
};

const ROLE_COLORS: Record<UserRole, string> = {
  superadmin: "#7c3aed", admin: "#5b5bd6", telecaller: "#0891b2",
  field_sales: "#ea580c", marketing: "#ec4899",
};

const ROLE_LABELS: Record<UserRole, string> = {
  superadmin: "Super Admin", admin: "Admin", telecaller: "Telecaller",
  field_sales: "Field Sales", marketing: "Marketing",
};

export default function UsersPage() {
  const [users, setUsers] = useState<CRMUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then(r => r.json())
      .then(d => { setUsers(d.data ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader
        title="Team Members"
        subtitle="Manage users, roles, and access control"
        badge="Users"
        badgeColor="#7c3aed"
        actions={
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold text-white transition-all"
            style={{ background: "linear-gradient(135deg,#7c3aed,#ec4899)", boxShadow: "0 1px 2px 0 rgba(124,58,237,0.25)" }}>
            <UserPlus className="w-4 h-4" /> Add User
          </button>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {(["superadmin","admin","telecaller","marketing"] as UserRole[]).map((role, i) => {
          const count = users.filter(u => u.role === role).length;
          const Icon = ROLE_ICONS[role];
          return (
            <motion.div key={role} className="rounded-xl p-4 flex items-center gap-3"
              style={SURFACE_STYLE}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${ROLE_COLORS[role]}12`, color: ROLE_COLORS[role] }}>
                <Icon className="w-4 h-4" strokeWidth={1.9} />
              </div>
              <div>
                <p className="text-[20px] font-semibold leading-none" style={{ color: "var(--crm-text-strong)" }}>{count}</p>
                <p className="text-[11px]" style={{ color: "var(--crm-text-muted)" }}>{ROLE_LABELS[role]}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {loading ? (
        <div className="text-center py-12 text-[13px]" style={{ color: "var(--crm-text-muted)" }}>Loading users…</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user, i) => {
            const Icon = ROLE_ICONS[user.role];
            const color = ROLE_COLORS[user.role];
            return (
              <motion.div key={user._id} className="rounded-xl p-5 transition-all"
                style={SURFACE_STYLE}
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                whileHover={{ y: -1, boxShadow: "0 4px 12px -2px rgb(16 24 40 / 0.08)" }}>
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-[15px] font-semibold text-white shrink-0"
                    style={{ background: `linear-gradient(135deg,${color},${color}80)` }}>
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold truncate" style={{ color: "var(--crm-text-strong)" }}>{user.name}</p>
                    <p className="text-[12px] truncate" style={{ color: "var(--crm-text-muted)" }}>{user.email}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                    style={{ background: user.isActive ? "var(--crm-success)" : "var(--crm-danger)" }}
                    title={user.isActive ? "Active" : "Inactive"} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium"
                    style={{ color, background: `${color}12`, border: `1px solid ${color}22` }}>
                    <Icon className="w-3 h-3" />
                    {ROLE_LABELS[user.role]}
                  </div>
                  {user.department && (
                    <span className="text-[11px]" style={{ color: "var(--crm-text-subtle)" }}>{user.department}</span>
                  )}
                </div>

                {user.phone && (
                  <p className="text-[12px] mt-3 flex items-center gap-1.5" style={{ color: "var(--crm-text-muted)" }}>
                    <Phone className="w-3 h-3" />{user.phone}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
