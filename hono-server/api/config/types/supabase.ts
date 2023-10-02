export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      appointment: {
        Row: {
          created_at: string;
          done: boolean;
          endDateTime: string;
          id: number;
          psychologistId: number;
          startDateTime: string;
          userId: number;
          notes?: string;
        };
        Insert: {
          created_at?: string;
          done?: boolean;
          endDateTime: string;
          id?: number;
          psychologistId: number;
          startDateTime: string;
          userId: number;
          notes?: string;
        };
        Update: {
          created_at?: string;
          done?: boolean;
          endDateTime?: string;
          id?: number;
          psychologistId?: number;
          startDateTime?: string;
          userId?: number;
          notes?: string;
        };
        Relationships: [
          {
            foreignKeyName: "appointment_psychologistId_fkey";
            columns: ["psychologistId"];
            referencedRelation: "psychologist";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "appointment_userId_fkey";
            columns: ["userId"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      diagnose: {
        Row: {
          name: string;
        };
        Insert: {
          name: string;
        };
        Update: {
          name?: string;
        };
        Relationships: [];
      };
      pshychologist_diagnose: {
        Row: {
          did: string;
          pid: number;
        };
        Insert: {
          did: string;
          pid?: number;
        };
        Update: {
          did?: string;
          pid?: number;
        };
        Relationships: [
          {
            foreignKeyName: "pshychologist_diagnose_did_fkey";
            columns: ["did"];
            referencedRelation: "diagnose";
            referencedColumns: ["name"];
          },
          {
            foreignKeyName: "pshychologist_diagnose_pid_fkey";
            columns: ["pid"];
            referencedRelation: "psychologist";
            referencedColumns: ["id"];
          }
        ];
      };
      psychologist: {
        Row: {
          age: number | null;
          created_at: string;
          degree: string | null;
          description: string | null;
          email: string;
          genders: string[] | null;
          id: number;
          image: string | null;
          minAge: number | null;
          name: string | null;
          pricePerHour: number | null;
          qualification: string | null;
          sessionType: string[] | null;
          years_of_expirence: number | null;
        };
        Insert: {
          age?: number | null;
          created_at?: string;
          degree?: string | null;
          description?: string | null;
          email: string;
          genders?: string[] | null;
          id?: number;
          image?: string | null;
          minAge?: number | null;
          name?: string | null;
          pricePerHour?: number | null;
          qualification?: string | null;
          sessionType?: string[] | null;
          years_of_expirence?: number | null;
        };
        Update: {
          age?: number | null;
          created_at?: string;
          degree?: string | null;
          description?: string | null;
          email?: string;
          genders?: string[] | null;
          id?: number;
          image?: string | null;
          minAge?: number | null;
          name?: string | null;
          pricePerHour?: number | null;
          qualification?: string | null;
          sessionType?: string[] | null;
          years_of_expirence?: number | null;
        };
        Relationships: [];
      };
      session: {
        Row: {
          created_at: string;
          id: number;
          psychologist_id: number;
          time: string;
          user_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          psychologist_id: number;
          time: string;
          user_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          psychologist_id?: number;
          time?: string;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "session_psychologist_id_fkey";
            columns: ["psychologist_id"];
            referencedRelation: "psychologist";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "session_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          created_at: string;
          day: number;
          email: string;
          gender: string | null;
          id: number;
          month: number;
          name: string;
          password: string;
          profilePhoto: string | null;
          year: number;
        };
        Insert: {
          created_at?: string;
          day: number;
          email: string;
          gender?: string | null;
          id?: number;
          month: number;
          name: string;
          password: string;
          profilePhoto?: string | null;
          year: number;
        };
        Update: {
          created_at?: string;
          day?: number;
          email?: string;
          gender?: string | null;
          id?: number;
          month?: number;
          name?: string;
          password?: string;
          profilePhoto?: string | null;
          year?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
