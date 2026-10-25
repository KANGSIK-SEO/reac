import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { CheckCircle2, CheckSquare2, ChevronLeft, ChevronRight, Command, Plus, Sparkles } from "lucide-react";
import { Button } from "./ui";

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={`app-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      <aside className="sidebar">
        <NavLink to="/tasks" className="brand" aria-label="모아 홈">
          <span className="brand-mark"><CheckSquare2 size={21} /></span>
          {!collapsed && <span>모아<small>MOA</small></span>}
        </NavLink>
        {!collapsed && <div className="workspace-label">WORKSPACE</div>}
        <nav className="main-nav" aria-label="주요 메뉴">
          <NavLink to="/tasks" end className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <CheckSquare2 size={18} /><span>내 태스크</span><kbd>⌘ 1</kbd>
          </NavLink>
          <NavLink to="/tasks/new" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <Plus size={18} /><span>새 태스크</span>
          </NavLink>
          <NavLink to="/tasks/completed" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <CheckCircle2 size={18} /><span>완료한 태스크</span>
          </NavLink>
        </nav>
        <div className="sidebar-bottom">
          {!collapsed && (
            <div className="sidebar-note">
              <span><Sparkles size={15} /> 오늘의 한마디</span>
              <p>완벽한 계획보다<br />꾸준한 한 걸음.</p>
            </div>
          )}
          <div className="sidebar-profile">
            <span className="avatar">M</span>
            {!collapsed && <span>나의 공간<small>개인 워크스페이스</small></span>}
            {!collapsed && <Command size={15} className="profile-command" />}
          </div>
        </div>
        <Button
          variant="ghost"
          className="collapse-button"
          aria-label={collapsed ? "사이드바 펼치기" : "사이드바 접기"}
          onClick={() => setCollapsed(!collapsed)}
          icon={collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        />
      </aside>
      <main className="main-content">
        <header className="mobile-header">
          <NavLink to="/tasks" className="brand"><span className="brand-mark"><CheckSquare2 size={19} /></span>모아</NavLink>
          <NavLink to="/tasks/new" className="mobile-add" aria-label="새 태스크"><Plus size={20} /></NavLink>
        </header>
        <div className="content-wrap"><Outlet /></div>
        <footer className="app-footer">작은 일부터 차근차근, <strong>모아</strong>와 함께 ✦</footer>
      </main>
    </div>
  );
}
